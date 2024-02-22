import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";

export default async function Home() {
    const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
    const inProgressCount = await prisma.issue.count({
        where: { status: "IN_PROGRESS" },
    });
    const closedCount = await prisma.issue.count({
        where: { status: "CLOSED" },
    });

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Flex direction="column" gap="5">
                <IssueSummary
                    open={openCount}
                    inProgress={inProgressCount}
                    closed={closedCount}
                />
                <IssueChart
                    open={openCount}
                    inProgress={inProgressCount}
                    closed={closedCount}
                />
            </Flex>
            <LatestIssues />
        </Grid>
    );
}

export const metadata: Metadata = {
    title: "Issue Tracker - Dashboard",
    description: "View a summary of project issues",
};
