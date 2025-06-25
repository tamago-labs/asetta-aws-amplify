'use client';

import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { PortfolioInvestment } from '@/types/dashboard';

interface PortfolioAnalyticsProps {
  portfolio: PortfolioInvestment[];
}

export default function PortfolioAnalytics({ portfolio }: PortfolioAnalyticsProps) {
  const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalInvested = portfolio.reduce((sum, item) => sum + item.totalInvested, 0);
  const totalGainLoss = totalPortfolioValue - totalInvested;
  const totalROI = totalInvested > 0 ? (totalGainLoss / totalInvested * 100) : 0;
  
  const bestPerformer = portfolio.reduce((best, current) => 
    current.roi > best.roi ? current : best, portfolio[0] || { roi: 0, projectName: 'N/A' }
  );
  
  const worstPerformer = portfolio.reduce((worst, current) => 
    current.roi < worst.roi ? current : worst, portfolio[0] || { roi: 0, projectName: 'N/A' }
  );

  const averageROI = portfolio.length > 0 ? 
    portfolio.reduce((sum, item) => sum + item.roi, 0) / portfolio.length : 0;

  const getROIColor = (roi: number) => {
    if (roi > 0) return 'text-green-600';
    if (roi < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getRoiIcon = (roi: number) => {
    if (roi > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (roi < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <BarChart3 className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Portfolio Analytics</h3>
      
      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Total Value</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">
            ${totalPortfolioValue.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            {getRoiIcon(totalROI)}
            <span className="text-sm text-gray-600">Total ROI</span>
          </div>
          <p className={`text-xl font-semibold ${getROIColor(totalROI)}`}>
            {totalROI >= 0 ? '+' : ''}{totalROI.toFixed(2)}%
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">Avg ROI</span>
          </div>
          <p className={`text-xl font-semibold ${getROIColor(averageROI)}`}>
            {averageROI >= 0 ? '+' : ''}{averageROI.toFixed(2)}%
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-600">Total Gain/Loss</span>
          </div>
          <p className={`text-xl font-semibold ${getROIColor(totalGainLoss)}`}>
            {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Best Performer</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{bestPerformer.projectName}</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">
                +{bestPerformer.roi?.toFixed(2)}% ROI
              </span>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Needs Attention</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{worstPerformer.projectName}</p>
            <div className="flex items-center gap-2">
              {worstPerformer.roi < 0 ? (
                <>
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-red-600 font-medium">
                    {worstPerformer.roi?.toFixed(2)}% ROI
                  </span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">
                    +{worstPerformer.roi?.toFixed(2)}% ROI
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Diversification */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Portfolio Diversification</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-semibold text-gray-900">{portfolio.length}</p>
            <p className="text-sm text-gray-600">Projects</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              ${(totalPortfolioValue / portfolio.length || 0).toFixed(0)}
            </p>
            <p className="text-sm text-gray-600">Avg Investment</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {portfolio.filter(p => p.kycStatus === 'APPROVED').length}
            </p>
            <p className="text-sm text-gray-600">KYC Approved</p>
          </div>
        </div>
      </div>
    </div>
  );
}