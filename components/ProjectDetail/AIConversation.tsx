import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";
import { createAIHooks, AIConversation } from "@aws-amplify/ui-react-ai";
import { Authenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

export const client = generateClient<Schema>({ authMode: "userPool" });
export const { useAIConversation, useAIGeneration } = createAIHooks(client);

interface AIConversationContainerProps {
    projectId?: string;
    projectData?: any;
}

const AIConversationContainer = ({ projectId, projectData }: AIConversationContainerProps) => {
    const [
        {
            data: { messages },
            isLoading,
        },
        handleSendMessage,
    ] = useAIConversation('Chat');
 
    return (
        <div className="h-full flex flex-col">
            <Authenticator>
                <div className="h-full flex flex-col">
                <AIConversation
                        messages={messages}
                        isLoading={isLoading}
                        handleSendMessage={handleSendMessage}
                        // className="h-full"
                        // style={{
                        //     height: '100%',
                        //     display: 'flex',
                        //     flexDirection: 'column'
                        // }}
                    />
                </div>
            </Authenticator>
        </div>
    )
}

export default AIConversationContainer