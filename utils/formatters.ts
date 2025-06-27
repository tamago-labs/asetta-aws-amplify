// Utility functions for data formatting

export const formatValue = (value: string) => {
    if (value.includes('$') || value.includes('M')) {
        return value;
    }
    const num = parseInt(value);
    if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num.toLocaleString()}`;
};

export const formatTokenCount = (count: string = '0') => {
    const num = parseInt(count);
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
};

export const calculateTokensSoldPercentage = (tokensSold: string = '0', totalTokens: string = '0') => {
    const sold = parseInt(tokensSold);
    const total = parseInt(totalTokens);
    return total > 0 ? Math.round((sold / total) * 100) : 0;
};

export const getCategoryIcon = (category: string = 'COMMERCIAL') => {
    switch (category.toUpperCase()) {
        case 'COMMERCIAL': return '🏢';
        case 'RESIDENTIAL': return '🏠';
        case 'MIXED_USE': return '🏗️';
        case 'INDUSTRIAL': return '🏭';
        case 'RETAIL': return '🛍️';
        case 'TREASURY': return '🏛️';
        case 'CORPORATE_BOND': return '💼';
        case 'MUNICIPAL_BOND': return '🏛️';
        case 'GOVERNMENT_BOND': return '🏛️';
        case 'PRECIOUS_METALS': return '🥇';
        case 'ENERGY': return '⚡';
        case 'AGRICULTURE': return '🌾';
        case 'INDUSTRIAL_METALS': return '⚙️';
        default: return '🏢';
    }
};

export const getStatusColor = (status: string = 'PREPARE') => {
    switch (status.toUpperCase()) {
        case 'ACTIVE': return 'bg-green-100 text-green-800';
        case 'LAUNCHING_SOON': return 'bg-blue-100 text-blue-800';
        case 'COMPLETED': return 'bg-gray-100 text-gray-800';
        case 'PREPARE': return 'bg-yellow-100 text-yellow-800';
        case 'PAUSED': return 'bg-orange-100 text-orange-800';
        case 'CANCELLED': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export const getStatusLabel = (status: string = 'PREPARE') => {
    switch (status.toUpperCase()) {
        case 'LAUNCHING_SOON': return 'Launching Soon';
        default: return status.charAt(0) + status.slice(1).toLowerCase();
    }
};

export const parseAssetMetadata = (metadata: string | null) => {
    if (!metadata) return {};
    try {
        return JSON.parse(metadata);
    } catch {
        return {};
    }
};
