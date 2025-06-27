import { NextRequest, NextResponse } from 'next/server';
import { type Schema } from '@/amplify/data/resource';
import {
    runWithAmplifyServerContext,
    reqResBasedClient,
} from "../../../utils/amplify-utils"

export async function PUT(request: NextRequest, response: NextResponse<any>) {
    try {

        // Parse the request body
        const body = await request.json();
        const { 
        	projectId,
            accessKey,
            status,
            smartContractId,
            tokenAddress,
            primarySalesAddress,
            vaultAddress,
            rfqAddress,
            coordinatorAddress,
            network,
            blockchainTxHash,
            blockNumber,
            deployedAt
        } = body;

        console.log("UPDATE#2",accessKey, status)

        // Validate required fields
        if (!accessKey || !status) {
            return new NextResponse(JSON.stringify({
                error: "Missing required fields: accessKey, status"
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate status enum
        const validStatuses = ["PREPARE", "ACTIVE", "LAUNCHING_SOON", "COMPLETED", "PAUSED", "CANCELLED"];
        if (!validStatuses.includes(status)) {
            return new NextResponse(JSON.stringify({
                error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const updatedProject = await runWithAmplifyServerContext({
            nextServerContext: { request, response },
            operation: async (contextSpec) => {
                // First, check if project exists and belongs to user
                const existingProject = await reqResBasedClient.models.Project.get(
                    contextSpec,
                    { id: projectId }
                );

                console.log("existingProject:", existingProject)

                if (!existingProject.data) {
                    throw new Error("Project not found");
                }

                if (existingProject.data.userProfileId !== accessKey) {
                    throw new Error("Unauthorized: Project does not belong to this user");
                }

                // Prepare update data
                const updateData: any = {
                    status
                };

                // Add smart contract fields if provided
                if (smartContractId) {
                    updateData.smartContractId = smartContractId;
                }
                if (tokenAddress) {
                    updateData.tokenAddress = tokenAddress;
                }
                if (primarySalesAddress) {
                    updateData.primarySalesAddress = primarySalesAddress;
                }
                if (vaultAddress) {
                    updateData.vaultAddress = vaultAddress;
                }
                if (rfqAddress) {
                    updateData.rfqAddress = rfqAddress;
                }
                if (coordinatorAddress) {
                    updateData.coordinatorAddress = coordinatorAddress;
                }
                if (network) {
                    updateData.network = network;
                }
                if (blockchainTxHash) {
                    updateData.blockchainTxHash = blockchainTxHash;
                }
                if (blockNumber) {
                    updateData.blockNumber = blockNumber;
                }
                if (deployedAt) {
                    updateData.deployedAt = deployedAt;
                }

                // Update project
                const { data: updatedEntry } = await reqResBasedClient.models.Project.update(
                    contextSpec,
                    {
                        id: projectId,
                        ...updateData
                    }
                );

                return updatedEntry;
            },
        });

        return new NextResponse(JSON.stringify({
            status: "success",
            message: "Project status updated successfully",
            project: {
                id: updatedProject?.id,
                status: updatedProject?.status,
                smartContractId: updatedProject?.smartContractId,
                tokenAddress: updatedProject?.tokenAddress,
                primarySalesAddress: updatedProject?.primarySalesAddress,
                vaultAddress: updatedProject?.vaultAddress,
                rfqAddress: updatedProject?.rfqAddress,
                coordinatorAddress: updatedProject?.coordinatorAddress,
                network: updatedProject?.network,
                blockchainTxHash: updatedProject?.blockchainTxHash,
                blockNumber: updatedProject?.blockNumber,
                deployedAt: updatedProject?.deployedAt,
                name: updatedProject?.name,
                type: updatedProject?.type
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Error updating project status:', error);
        
        if (error.message === "Project not found") {
            return new NextResponse(JSON.stringify({
                error: "Project not found"
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (error.message.includes("Unauthorized")) {
            return new NextResponse(JSON.stringify({
                error: "Unauthorized access to project"
            }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new NextResponse(JSON.stringify({
            error: "Failed to update project status",
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}