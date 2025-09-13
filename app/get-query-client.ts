// import { QueryClient, isServer } from "@tanstack/react-query";

// function makeQueryClient() {
//     return new QueryClient({
//         defaultOptions: {
//             queries: {
//                 staleTime: 60 * 1000,
//                 retry: (failureCount, error: any) => {
//                     if (error?.response?.status === 401 || error?.response?.status === 403) {
//                         return false;
//                     }
//                     return failureCount < 3;
//                 },
//             },
//         },
//     });
// }

// let browserQueryClient: QueryClient | undefined = undefined;

// export function getQueryClient() {
//     if (!isServer) {
//         return makeQueryClient();
//     } else {
//         if (!browserQueryClient) browserQueryClient = makeQueryClient();
//         return browserQueryClient;
//     }
// }
