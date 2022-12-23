import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
	handleEditMode: () => void;
}

export default function NavBar({ handleEditMode }: Props) {
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item header>
					<img src="/assets/logo.png" alt="log" style={{ marginRight: '10px' }} />
					Reactivities
				</Menu.Item>
				<Menu.Item name="Activities" />
				<Menu.Item>
					<Button onClick={handleEditMode} positive content="Create Activity" />
				</Menu.Item>
			</Container>
		</Menu>
	)
}