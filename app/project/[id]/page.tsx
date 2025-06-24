import ProjectDetailContainer from "@/components/ProjectDetail"

export default async function ProjectPage({params} : any ) {
    const { id } = await params

    return (
        <ProjectDetailContainer
            id={id}
        />
    )
}