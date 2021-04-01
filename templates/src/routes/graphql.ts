import type { RequestHandler, Response } from "@sveltejs/kit";
import { getGraphQLParameters } from "graphql-helix/dist/get-graphql-parameters.js";
import { processRequest } from "graphql-helix/dist/process-request.js";
import { renderGraphiQL } from "graphql-helix/dist/render-graphiql.js";
import { shouldRenderGraphiQL } from "graphql-helix/dist/should-render-graphiql.js";

import { createSchema, defaultQuery } from "../graphql/schema";

const schemaPromise = createSchema();

const respond = async (request): Promise<Response> => {
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
		contextFactory: () => ({ authorization: request.headers["Authorization"] ?? request.headers["authorization"] }),
		request,
		schema: await schemaPromise,
	});

	const headers = {};

	for (let x = 0; x < result.headers.length; x++) {
		headers[result.headers[x].name] = result.headers[x].value;
	}

	if (result.type === "RESPONSE") return {
		body: result.payload,
		headers,
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

export const del: RequestHandler = ({ body, query, context: { headers } }) => respond({ body, headers, method: "DELETE", query });
export const get: RequestHandler = ({ body, query, context: { headers } }) => respond({ body, headers, method: "GET", query });
export const head: RequestHandler = ({ body, query, context: { headers } }) => respond({ body, headers, method: "HEAD", query });
export const post: RequestHandler = ({ body, query, context: { headers } }) => respond({ body, headers, method: "POST", query });
export const put: RequestHandler = ({ body, query, context: { headers } }) => respond({ body, headers, method: "PUT", query });
