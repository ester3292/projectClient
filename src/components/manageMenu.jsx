
import { Outlet, useNavigate } from "react-router-dom";

export const ManageMenu = () => {


    const navigate = useNavigate()


    return <div>
        <br />
        <div className="manageMenueAba">
            <button className="manageMenu" onClick={() => {
                navigate(`showTeachers`);
            }}> Teachers</button>
            <br />
            <button className="manageMenu" onClick={() => {
                navigate(`showStudents`);
            }}> Students</button>
            <br />


        </div>
        <div className="menuAba">
            <br />

            <div style={{ flex: "100%" }}>
                <Outlet></Outlet>
            </div>

        </div>
    </div>
}
