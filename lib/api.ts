import { generateClient } from 'aws-amplify/data'; import type { Schema } from '@/amplify/data/resource';
import { UserProfile, PortfolioInvestment, CreatedProject } from '@/types/dashboard';

const client = generateClient<Schema>({
    authMode: "userPool"
});

// User Profile API functions

export const userProfileAPI = {
    // Get user profile by ID  
    async getProfile(username: string) {
        try {

            let entry
 
            const user = await client.models.UserProfile.list({
                filter: {
                    username: {
                        eq: username
                    }
                }
            })
 
            if (user.data.length === 0) { 
                const data = this.createProfile({
                    username
                })
    
                entry = data
            } else {
                entry = user.data[0]
            }
            return entry
        } catch (error) {
            console.log(error)
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },
    // Update user profile  
    async updateProfile(userId: string, profileData: {
        username?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        dateOfBirth?: string;
        nationality?: string;
        walletAddress?: string;
    }) {
        try { 
            const response = await client.models.UserProfile.update({
                id: userId,
                ...profileData
            }); 
            const { data: updatedProfile  } = response 
            return updatedProfile;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    },
    // Create user profile  
    async createProfile(profileData: {
        username: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        dateOfBirth?: string;
        nationality?: string;
        walletAddress?: string;
    }) {
        try {
            const { data: newProfile } = await client.models.UserProfile.create(profileData);
            return newProfile;
        } catch (error) {
            console.error('Error creating user profile:', error);
            throw error;
        }
    }
};

// Project API functions
export const projectAPI = {
    // Get projects created by user  
    async getUserProjects(userProfileId: string) {
        try {
            const { data: projects } = await client.models.Project.list({
                filter: { userProfileId: { eq: userProfileId } }
            });
            return projects;
        } catch (error) {
            console.error('Error fetching user projects:', error);
            throw error;
        }
    },
    // Get all projects for investment portfolio 
    async getAllProjects() {
        try {
            const { data: projects } = await client.models.Project.list();
            return projects;
        } catch (error) {
            console.error('Error fetching all projects:', error);
            throw error;
        }
    },
    // Get project by ID  
    async getProject(projectId: string) {
        try {
            const { data: project } = await client.models.Project.get({ id: projectId });
            return project;
        } catch (error) {
            console.error('Error fetching project:', error);
            throw error;
        }
    },
    // Create new project  
    async createProject(projectData: any) {
        try {
            const { data: newProject } = await client.models.Project.create(projectData);
            return newProject;
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    },
    // Update project 
    async updateProject(projectId: string, projectData: any) {
        try {
            const { data: updatedProject } = await client.models.Project.update({
                id: projectId, ...projectData
            }); return updatedProject;
        } catch (error) { console.error('Error updating project:', error); throw error; }
    }
};

// KYC API functions
export const kycAPI = {
    // Get KYC status for user's projects  
    async getUserKYCs(userProfileId: string) {
        try {
            const { data: kycs } = await client.models.ProjectKYC.list({
                filter: { userProfileId: { eq: userProfileId } }
            }); return kycs;
        }
        catch (error) {
            console.error('Error fetching user KYCs:', error);
            throw error;
        }
    },
    // Get KYC status for specific project  
    async getProjectKYC(userProfileId: string, projectId: string) {
        try {
            const { data: kycs } = await client.models.ProjectKYC.list({
                filter: {
                    and: [{ userProfileId: { eq: userProfileId } },
                    { projectId: { eq: projectId } }
                    ]
                }
            });
            return kycs[0]; // Should only be one KYC per user per project    
        } catch (error) {
            console.error('Error fetching project KYC:', error);
            throw error;
        }
    },
    // Update KYC status  
    async updateKYC(kycId: string, kycData: any) {
        try {
            const { data: updatedKYC } = await client.models.ProjectKYC.update({ id: kycId, ...kycData });
            return updatedKYC;
        } catch (error) {
            console.error('Error updating KYC:', error);
            throw error;
        }
    },
    // Create KYC record  
    async createKYC(kycData: any) {
        try {
            const { data: newKYC } = await client.models.ProjectKYC.create(kycData);
            return newKYC;
        } catch (error) {
            console.error('Error creating KYC:', error);
            throw error;
        }
    }
};
// Document API functions
export const documentAPI = {
    // Get documents for a project  
    async getProjectDocuments(projectId: string) {
        try {
            const { data: documents } = await client.models.ProjectDocument.list({
                filter: { projectId: { eq: projectId } }
            });
            return documents;
        } catch (error) {
            console.error('Error fetching project documents:', error);
            throw error;
        }
    },
    // Upload/create document  
    async createDocument(documentData: any) {
        try {
            const { data: newDocument } = await client.models.ProjectDocument.create(documentData);
            return newDocument;
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }
};

// Helper function to format portfolio data
export const formatPortfolioData = (projects: any[], kycs: any[]): PortfolioInvestment[] => {
    // This would contain logic to combine project data with user's investment data 
    // For now, returning mock data structure  
    return projects.map(project => {
        const projectKYC = kycs.find(kyc => kyc.projectId === project.id);
        return {
            projectId: parseInt(project.id),
            projectName: project.name,
            tokensOwned: 0, // This would come from blockchain/smart contract      
            tokenPrice: parseFloat(project.tokenPrice) || 0,
            currentValue: 0, // Calculate based on tokens owned     
            totalInvested: 0, // This would come from investment history    
            roi: 0, // Calculate based on current vs invested     
            kycStatus: projectKYC?.kycStatus || 'PENDING'
        };
    });
};
