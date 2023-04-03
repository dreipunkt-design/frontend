import React, { createContext, useReducer, useContext } from "react"

//Define Context
const GlobalStateContext = createContext()
const GlobalDispatchContext = createContext()

//Reducer
const globalReducer = (state, action) => {
    switch (action.type) {
        case "NAVIGATION_TYPE": {
            return {
                ...state,
                darkNavigation: action.darkNavigation,
            }
        }
        case "MENU_OPEN_TYPE": {
            return {
                ...state,
                menuOpen: action.menuOpen,
            }
        }
        case "SCROLLBAR_DISABLED_TYPE": {
            return {
                ...state,
                scrollbarDisabled: action.scrollbarDisabled,
            }
        }
        case "CURSOR_TYPE": {
            return {
                ...state,
                cursorType: action.cursorType,
                cursorImage: action.image,
                cursorCaption: action.caption
            }
        }
        case "THUMB_POSITION_TYPE": {
            return {
                ...state,
                thumbPosition: action.thumbPosition,
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

//Provider
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, {
        menuOpen: false,
        scrollbarDisabled: false,
        darkNavigation: true,
        cursorType: false,
        cursorImage: false,
        cursorCaption: false,
        thumbPosition: null,
        cursorStyles: ["hovered", "locked", "project", "projectNext", "projectPrev", "news", "caption", "none"],
    })

    return (
        <GlobalDispatchContext.Provider value={dispatch}>
            <GlobalStateContext.Provider value={state}>
                {children}
            </GlobalStateContext.Provider>
        </GlobalDispatchContext.Provider>
    )
}

//custom hooks for when we want to use our global state
export const useGlobalStateContext = () => useContext(GlobalStateContext)
export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)
