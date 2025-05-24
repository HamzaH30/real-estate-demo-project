// Custom hook to use Appwrite
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

/*

    This is a custom hook that is used to fetch data from Appwrite.
    It is a wrapper around the useCallback and useEffect hooks.
    It is used to fetch data from Appwrite and return the data, loading, error, and a function to refetch the data.

    'T' is the type of the data to return.
    'P' is the type of the parameters to pass to the appWrite function.
*/

// Interface for the useAppwrite hook
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
    fn: (params: P) => Promise<T>; // The appWrite function to call
    params?: P; // The parameters to pass to the appWrite function
    skip?: boolean; // Whether to skip the fetch. If true, the fetch will not be executed.
}

// Interface for the return value of the useAppwrite hook
interface UseAppwriteReturn<T, P> {
    data: T | null; // The data to return
    loading: boolean; // Whether the fetch is loading
    error: string | null; // The error to return
    refetch: (newParams: P) => Promise<void>; // The function to refetch the data. Let's say we have a list of users, and we want to refetch the list of users. Call it again with new params.
}

export const useAppwrite = <T, P extends Record<string, string | number>>({
    fn: functionToCall, // Whatever function we want to call.
    params = {} as P, // The parameters to pass to the function.
    skip = false, // Whether to skip the fetch. If true, the fetch will not be executed.
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
    const [data, setData] = useState<T | null>(null); // The data to return.
    const [loading, setLoading] = useState(!skip); // Whether the fetch is loading.
    const [error, setError] = useState<string | null>(null); // The error to return.

    // 'fetchData' is a function that is used to fetch the data. Runs the API call and updates all state accordingly.
    const fetchData = useCallback( // This is a function that is used to fetch the data. Runs the API call and updates all state accordingly. useCallback is used to prevent unnecessary re-renders as it only re-runs if the function changes, since it also only recreates the function if something in the function changes. Essentially remembering/storing the function.
        async (fetchParams: P) => {
            // Set the loading state to true.
            setLoading(true);

            // Set the error state to null.
            setError(null);

            // Try to fetch the data.
            try {
                // Call the appWrite function with the fetchParams.
                const result = await functionToCall(fetchParams);

                // Set the data state to the result.
                setData(result);
            } catch (err: unknown) {
                // If the error is an instance of Error, set the error state to the error message.
                const errorMessage =
                    err instanceof Error ? err.message : "An unknown error occurred";

                // Set the error state to the error message.
                setError(errorMessage);

                // Alert the error message.
                Alert.alert("Error", errorMessage);
            } finally {
                // Set the loading state to false.
                setLoading(false);
            }
        },
        [functionToCall] // Only re-run if the function changes.
    );

    // UseEffect to run the fetchData function when the component mounts.
    useEffect(() => {
        // If the skip state is false, run the fetchData function.
        // skip means that the fetch is not needed. This would be the case if we are on the home page and we don't need to fetch the data again.
        if (!skip) {
            // Run the fetchData function.
            fetchData(params);
        }
    }, []);

    // 'refetch' is a function that is used to refetch the data.
    const refetch = async (newParams: P) => await fetchData(newParams);

    return { data, loading, error, refetch };
};