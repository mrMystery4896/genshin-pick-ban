import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
import { CharacterProvider } from "../contexts/CharacterContext";

/*//TODO:
	1. Implement Timer feature
	3. Implement spectator feature
	4. Finish PickedBanned Component (Display picked banned character icons)
	5. Implement hover skill icon to show detail
	6. Implement voice lines when picking and banning
	7. Implement feature that only start game when both player is ready
*/
function App() {
	return (
		<div>
			<CharacterProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/room/:roomId" element={<Room />} />
					</Routes>
				</BrowserRouter>
			</CharacterProvider>
		</div>
	);
}

export default App;
