'use client'
import { useEffect, useState } from "react";
import { UserProps } from "../shared/header";
import axios from "axios";
import { useSession } from "next-auth/react";

export const useUserFetch = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) return;

        const handleUser = async () => {
            try {
                const resp = await axios.get("/api/user");
                setUser(resp.data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        handleUser();
    }, [session]);

    return { user, loading };
}