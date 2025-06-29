import ProjectDetailContainer from "@/components/ProjectDetail"

export default async function ProjectPage({params} : any ) {
    const { id } = await params

    return (
        <>
        <header className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">
          <b>Disclaimer:</b> This client-side version is under development and not fully functional. Please use the desktop app for seamless RWA project creation with AI
        </p>
      </div>
    </div>
  </div>
</header>
<ProjectDetailContainer
            id={id}
        />
        </>
    )
}