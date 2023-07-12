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
    isOverPage:false,
    productId:null,
    isAccountNav:false,
    pageWidth:0
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
        ,
        setIsOverPage:(state, action)=>{
            state.isOverPage = action.payload
        }
        ,
        setProductId:(state, action)=>{
            state.productId = action.payload
        },

        setIsAccountNav:(state, action)=>{
            state.isAccountNav= action.payload
        },
        setPageWidth:(state, action)=>{
            state.pageWidth= action.payload
        }
    }
})

export const {setIsPromptMessage,setPromptMessage, setCartMini,setProcessModal, setIsToggleMobileNav,
    setIsOverPage, setIsAnimateMobileNav, setProductId, setIsAccountNav, setPageWidth} = promptMessageSlice.actions;

export default promptMessageSlice.reducer;