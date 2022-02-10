import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
import { CharacterProvider } from "../contexts/CharacterContext";

/*//TODO:
	3. Implement spectator feature
	6. Implement voice lines when picking and banning
	7. Implement feature that only start game when both player is ready
	8. Implement feature that ends game when max turn count is reached
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
