import type { GetContext } from "@sveltejs/kit";

export const getContext: GetContext = ({ headers }) => {
    return { headers };
};
