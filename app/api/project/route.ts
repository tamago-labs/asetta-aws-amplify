import { NextRequest, NextResponse } from 'next/server';
import { type Schema } from '@/amplify/data/resource';
import {
    runWithAmplifyServerContext,
    reqResBasedClient,
} from "../../../utils/amplify-utils"

export async function POST(request: NextRequest, response: NextResponse<any>) {
    try {
        // Parse the request body
        const body = await request.json();
        const { 
            accessKey,
            name,
            type,
            location,
            value,
            tokenPrice,
            category,
            status = "PREPARE",
            yieldRate,
            occupancy,
            totalTokens,
            previewImage,
            images,
            // Asset-specific fields
            yearBuilt,
            squareFootage,
            maturityDate,
            couponRate,
            creditRating,
            commodityGrade,
            storageLocation,
            // Metadata and requirements
            assetMetadata,
            kycRequirements,
            requiredKycLevel = "BASIC",
            jurisdiction,
            regulatoryFramework,
            minimumInvestment,
            maximumInvestment,
            investorRestrictions
        } = body;

        // Validate required fields
        if (!accessKey || !name || !type || !location || !value || !tokenPrice || !category) {
            return new NextResponse(JSON.stringify({
                error: "Missing required fields: accessKey, name, type, location, value, tokenPrice, category"
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const project = await runWithAmplifyServerContext({
            nextServerContext: { request, response },
            operation: async (contextSpec) => {
                const { data: entry } = await reqResBasedClient.models.Project.create(
                    contextSpec,
                    {
                        userProfileId: accessKey,
                        name,
                        type,
                        location,
                        value,
                        tokenPrice,
                        category,
                        status,
                        yieldRate,
                        occupancy,
                        tokensSold: "0", // Default to 0
                        totalTokens,
                        previewImage,
                        images,
                        // Asset-specific fields
                        yearBuilt,
                        squareFootage,
                        maturityDate,
                        couponRate,
                        creditRating,
                        commodityGrade,
                        storageLocation,
                        // Metadata and requirements
                        assetMetadata,
                        kycRequirements,
                        requiredKycLevel,
                        jurisdiction,
                        regulatoryFramework,
                        minimumInvestment,
                        maximumInvestment,
                        investorRestrictions
                    }
                );
                return entry;
            },
        });

        return new NextResponse(JSON.stringify({
            status: "success",
            message: "RWA Project created successfully",
            project: {
                id: project?.id,
                name: project?.name,
                type: project?.type,
                category: project?.category,
                status: project?.status,
                value: project?.value,
                tokenPrice: project?.tokenPrice
            }
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Error creating RWA project:', error);
        return new NextResponse(JSON.stringify({
            error: "Failed to create RWA project",
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET(request: NextRequest, response: NextResponse<any>) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const accessKey = searchParams.get('access_key');
        const projectId = searchParams.get('project_id');

        if (!accessKey) {
            return new NextResponse(JSON.stringify({
                error: "access_key parameter is required"
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const result = await runWithAmplifyServerContext({
            nextServerContext: { request, response },
            operation: async (contextSpec) => {
                if (projectId) {
                    // Get specific project
                    const response = await reqResBasedClient.models.Project.get(
                        contextSpec,
                        { id: projectId }
                    );
                    return response.data;
                } else {
                    // Get all projects for user
                    const response = await reqResBasedClient.models.Project.list(
                        contextSpec,
                        {
                            filter: {
                                userProfileId: { eq: accessKey }
                            }
                        }
                    );
                    return response.data;
                }
            },
        });

        return new NextResponse(JSON.stringify({
            status: "success",
            data: result
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Error retrieving projects:', error);
        return new NextResponse(JSON.stringify({
            error: "Failed to retrieve projects",
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
