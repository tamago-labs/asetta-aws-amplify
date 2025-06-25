import { NextRequest, NextResponse } from 'next/server';
import { type Schema } from '@/amplify/data/resource';

import {
    runWithAmplifyServerContext,
    reqResBasedClient,
} from "../../../utils/amplify-utils"


export async function GET(request: NextRequest, response: NextResponse<any>) {

    const searchParams = request.nextUrl.searchParams
    const query: any = searchParams.get('access_key')

    const user = await runWithAmplifyServerContext({
        nextServerContext: { request, response },
        operation: async (contextSpec) => {
            const response = await reqResBasedClient.models.UserProfile.get(
                contextSpec,
                {
                    id: query
                }
            );
            const { data } = response
            return data;
        },
    })

    return new NextResponse(JSON.stringify({ 
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

}