import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToolPage from "../pages/tool/ToolPage";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ToolPage/>} />
            </Routes>
        </BrowserRouter>
    );
};