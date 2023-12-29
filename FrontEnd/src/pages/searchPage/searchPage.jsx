import { SearchCards } from "../../components/search/searchCards";
import imageTest from "../../assets/imgs/11.jpeg"

export default function SearcPage() {
	return (
		<>
			<div className="w-screen h-full flex place-items-center gap-2 px-2">
				<SearchCards image={imageTest} text={"lalalal"}/>
                <SearchCards />
			</div>
		</>
	);
}
