import { createContext } from "react";

interface OverlaysContextValues {}

const OverlaysContext = createContext<OverlaysContextValues>({});

export default OverlaysContext;
