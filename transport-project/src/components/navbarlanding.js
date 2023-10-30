import { useLogout } from "../hooks/useLogout";
import "./Navbarlanding.modules.css";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import { Group, Box } from "@mantine/core";

export default function Navbarlanding() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <Box pb={20}>
      <header className="header">
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            <NavLink className="link" to="/">
              Home
            </NavLink>
            <NavLink className="link" to="/about">
              About
            </NavLink>
            <NavLink className="link" to="/contact">
              Contacto
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
            {!user && (
              <>
                <NavLink className="link" to="/login">
                  Login
                </NavLink>
                <NavLink className="link" to="/signup">
                  Signup
                </NavLink>
              </>
            )}

            {user && 
              <>
              <p className="link">Hello, {user.displayName}</p>
              <NavLink className="link" onClick={logout}>
                Logout
              </NavLink>
              </>
            }
          </Group>
        </Group>
      </header>
    </Box>
  );
}
