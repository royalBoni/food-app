import {createSlice} from '@reduxjs/toolkit'

const myId= JSON.parse(localStorage.getItem("myUserId"));

const initialState={
    promptMessage:null,
    isPromptMessage:false,
    userId:myId?.id,
    cartMini:false,
    processModal:null,
    isToggleMobileNav:true,
    isAnimateMobileNav:false,
}

export const promptMessageSlice =createSlice({
    name: 'promptMessage',
    initialState,
    reducers:{
       
        setPromptMessage:(state,action)=>{
            state.promptMessage = action.payload;
        },

        setIsPromptMessage:(state,action)=>{
            state.isPromptMessage= action.payload
        },

        setCartMini:(state, action)=>{
            state.cartMini= action.payload
        },
        setProcessModal:(state, action)=>{
            state.processModal= action.payload
        },
        setIsToggleMobileNav:(state, action)=>{
            state.isToggleMobileNav= action.payload
        }
        ,setIsAnimateMobileNav:(state, action)=>{
            state.isAnimateMobileNav= action.payload
        }
    }
})

export const {setIsPromptMessage,setPromptMessage, setCartMini,setProcessModal, setIsToggleMobileNav, setIsAnimateMobileNav} = promptMessageSlice.actions;

export default promptMessageSlice.reducer;