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
            // Required fields
            name,
            type,
            category,
            location,
            totalAssetValue,
            tokenPrice,
            totalTokens,
            minimumInvestment,
            // Optional fields
            status = "PREPARE",
            buildingSize,
            yearBuilt,
            occupancyRate,
            monthlyRentalIncome,
            keyTenants,
            previewImage,
            images
        } = body;

        // Validate required fields
        if (!accessKey || !name || !type || !category || !location || !totalAssetValue || !tokenPrice || !totalTokens || !minimumInvestment) {
            return new NextResponse(JSON.stringify({
                error: "Missing required fields: accessKey, name, type, category, location, totalAssetValue, tokenPrice, totalTokens, minimumInvestment"
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const project = await runWithAmplifyServerContext({
            nextServerContext: { request, response },
            operation: async (contextSpec) => {
                const response = await reqResBasedClient.models.Project.create(
                    contextSpec,
                    {
                        userProfileId: accessKey,
                        name,
                        type,
                        location,
                        value: totalAssetValue,
                        tokenPrice,
                        category,
                        status,
                        tokensSold: "0", // Default to 0
                        totalTokens,
                        occupancy: occupancyRate,
                        yearBuilt,
                        squareFootage: buildingSize,
                        minimumInvestment,
                        previewImage,
                        images,
                        // Store additional MVP fields in assetMetadata
                        assetMetadata: JSON.stringify({
                            monthlyRentalIncome,
                            keyTenants
                        })
                    }
                ); 
                const entry = response?.data
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
                totalAssetValue: project?.value,
                tokenPrice: project?.tokenPrice,
                totalTokens: project?.totalTokens,
                minimumInvestment: project?.minimumInvestment
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
