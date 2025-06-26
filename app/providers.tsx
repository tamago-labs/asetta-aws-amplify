'use client';
 
// import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

export function Providers({ children }: any) {

    return (
        <div>
            {children}
        </div>
    );
}

