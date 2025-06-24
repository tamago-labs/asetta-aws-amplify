'use client';

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, useTheme, View, Heading, Image, Text, Button, ThemeProvider, Theme } from '@aws-amplify/ui-react';

Amplify.configure(outputs);


const components = {
    Header() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <div className="flex items-center space-x-3">
                    <div className="relative px-4 py-2   flex items-center mx-auto ">
                        <h1 className="  text-black text-lg mx-auto z-10">Asetta Platform v.0.1</h1>
                    </div>
                </div>
            </View>
        );
    },
    Footer() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Text color={tokens.colors.black}>
                    Secured by AWS Cognito
                </Text>
            </View>
        );
    },
};

export function Providers({ children }: any) {

    const { tokens } = useTheme()

    const theme: Theme = {
        name: 'Auth Theme',
        tokens: {
            components: {
                authenticator: {
                    router: {
                        boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
                        borderWidth: '0'
                    }
                },
                tabs: {
                    item: {
                        backgroundColor: "#08111530",
                        borderColor: "#08111530"
                    },
                },
            },
        },
    }

    return (
        <ThemeProvider theme={theme}>
            <View className="min-h-screen relative">
                <Authenticator components={components}>
                    {children}
                </Authenticator>
            </View>
        </ThemeProvider>
    );
}

