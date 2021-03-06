import { getGraphQLParameters } from "graphql-helix/dist/get-graphql-parameters.js";
import { processRequest } from "graphql-helix/dist/process-request.js";
import { renderGraphiQL } from "graphql-helix/dist/render-graphiql.js";
import { shouldRenderGraphiQL } from "graphql-helix/dist/should-render-graphiql.js";

import { createSchema, defaultQuery } from "./_graphql/schema";

const schemaPromise = createSchema();

const respond = async (request) => {
	if (shouldRenderGraphiQL(request)) return {
		body: renderGraphiQL({
			defaultQuery,
		}),
		headers: { "Content-Type": "text/html" },
		status: 200,
	};

	const parameters = getGraphQLParameters(request);
	const result = await processRequest({
		...parameters,
		// For example, auth information is put in context for the resolver
		contextFactory: () => ({ authorization: request.headers["Authorization"] }),
		request,
		schema: await schemaPromise,
	});

	if (result.type === "RESPONSE") return {
		body: result.payload,
		headers: result.headers,
		status: result.status,
	};

	return {
		// Think you could help?
		// https://github.com/svelte-add/graphql/issues/1
		body: "svelte-add/graphql doesn't support multipart responses or event streams",
		headers: {},
		status: 501,
	};
};

export const del = ({ body, query }, { headers }) => respond({ body, headers, method: "DELETE", query });
export const get = ({ body, query }, { headers }) => respond({ body, headers, method: "GET", query });
export const head = ({ body, query }, { headers }) => respond({ body, headers, method: "HEAD", query });
export const post = ({ body, query }, { headers }) => respond({ body, headers, method: "POST", query });
export const put = ({ body, query }, { headers }) => respond({ body, headers, method: "PUT", query });
