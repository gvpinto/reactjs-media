import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};


const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            // TODO REMOVE FOR PRODUCTION
            await pause(1000);
            return fetch(...args);
        }
    }),

    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (results, error, album) => {
                    return [{ type: 'Album', id: album.id }];
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    };
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (results, error, user) => {
                    // return [{ type: 'Album', id: user.id }];
                    return [{ type: 'UsersAlbums', id: user.id }];
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            title: faker.commerce.productName(),
                            userId: user.id
                        }

                    };
                }
            }),
            // Endpoint function -> useFetchAlbumsQuery
            fetchAlbums: builder.query({
                providesTags: (results, error, user) => {
                    // Replacing these tags for a smart one
                    // return [{ type: 'Album', id: user.id }];
                    const tags = results.map((album) => {
                        return { type: 'Album', id: album.id };
                    });
                    tags.push({ type: 'UsersAlbums', id: user.id });
                    return tags;
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET'
                    };
                }
            }),

        };
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };