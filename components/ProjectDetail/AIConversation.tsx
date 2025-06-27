import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";
import { createAIHooks, AIConversation } from "@aws-amplify/ui-react-ai";
import { Authenticator } from "@aws-amplify/ui-react";

export const client = generateClient<Schema>({ authMode: "userPool" });
export const { useAIConversation, useAIGeneration } = createAIHooks(client);

const AIConversationContainer = () => {

    const [
        {
            data: { messages },
            isLoading,
        },
        handleSendMessage,
    ] = useAIConversation('Chat');

    return (
        <div>
              <Authenticator>
            <AIConversation
                messages={messages}
                isLoading={isLoading}
                handleSendMessage={handleSendMessage}
            />
        </Authenticator>
        </div>
      
    )
}

export default AIConversationContainer