import { v4 } from "uuid";

export default function useUserId() {
	if (localStorage.getItem("userId") === null) {
		localStorage.setItem("userId", v4());
	}
	return localStorage.getItem("userId");
}
