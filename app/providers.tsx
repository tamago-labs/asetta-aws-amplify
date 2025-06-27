'use client';
 
// import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { WagmiProviders } from "@/providers/WagmiProviders"

Amplify.configure(outputs);

export function Providers({ children }: any) {

    return (
        <WagmiProviders>
            {children}
        </WagmiProviders>
    );
}

