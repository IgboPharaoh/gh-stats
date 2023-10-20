import { Comment } from "@/types/comments"
import { Project } from "@/types/pull_requests"

export const getIssueNumber = (arg: string) => {
    const splitUrl = arg.split("#")
    const firstItem = splitUrl[0].split("/")
    return firstItem[firstItem.length - 1]
}

export const contentHeading = (
    issues: Comment[],
    type: "own" | "others" | "long"
) => {
    return type === "long" && issues.length === 1
        ? `${issues.length} long comment on issues`
        : type !== "long" && issues.length === 1
        ? `${issues.length} comment on ${type} issues`
        : type === "long" && issues.length > 1
        ? `${issues.length} long comments on issues`
        : `${issues.length} comments on ${type} issues`
}

export const collapsibleHeader = (repoUrl: string, username: string) => {
    repoUrl = `${repoUrl}/`
    const splitRepoUrl = repoUrl.split(".com/")

    const getCoy = splitRepoUrl[1].split("/").slice(0, 2)
    if (getCoy[0].toLowerCase() === username.toLowerCase()) return getCoy[1]

    return getCoy.join("-")
}

export const getOrganisations = (
    prsData: any,
    issueData: any,
    username: string
) => {
    const prOrgs: Array<Project> = prsData?.pullRequests?.edges
        .filter(
            (pr: any) =>
                pr.node.repository.owner.login.toLowerCase() !==
                username.toLowerCase()
        )
        .map((pr: any) => ({
            login: pr.node.repository.owner.login,
            avatarUrl: pr.node.repository.owner.avatarUrl
        }))

    const issueOrgs: Array<Project> = issueData?.issueComments?.nodes
        .filter(
            (issue: any) =>
                issue.repository.owner.login.toLowerCase() !==
                username.toLowerCase()
        )
        .map((issue: any) => ({
            login: issue.repository.owner.login,
            avatarUrl: issue.repository.owner.avatarUrl
        }))

    const orgs = [...prOrgs, ...issueOrgs].filter(
        (value, index, arr) =>
            arr.map((x) => x.login).indexOf(value.login) === index
    )

    return { orgs }
}