import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

// TODO: Make "New Issue" button link be the full button, now only the text

interface Props {
    searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const statuses = Object.values(Status);

    // Validate status filter
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const where = { status };

    // Validate sort
    const orderBy = columnNames.includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: "asc" }
        : undefined;

    // Retrieve issues from database
    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({ where });

    return (
        <Flex direction="column" gap="3">
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination
                pageSize={pageSize}
                currentPage={page}
                itemCount={issueCount}
            />
        </Flex>
    );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
    title: "Issue Tracker - Issue List",
    description: "View all project issues",
};
