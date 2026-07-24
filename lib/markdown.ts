import type { Components } from "react-markdown";

import CodeBlock from "@/components/markdown/code-block";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/markdown/table";

export const markdownComponents: Components = {
    pre({ children }) {
        const child = children as React.ReactElement<{
            className?: string;
            children?: React.ReactNode;
        }>;

        const language =
            child.props.className?.replace("language-", "") ??
            "text";

        const code = String(child.props.children ?? "").replace(
            /\n$/,
            ""
        );

        return (
            <CodeBlock
                language={language}
        code={code}
        />
    );
    },

    table(props) {
        return <Table {...props} />;
    },

    thead(props) {
        return <TableHeader {...props} />;
    },

    tbody(props) {
        return <TableBody {...props} />;
    },

    tr(props) {
        return <TableRow {...props} />;
    },

    th(props) {
        return <TableHead {...props} />;
    },

    td(props) {
        return <TableCell {...props} />;
    },

    a(props) {
        return (
            <a
                {...props}
        target="_blank"
        rel="noopener noreferrer"
            />
    );
    },
};