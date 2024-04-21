import React, { createContext, useState } from 'react'

export const isAuthTokenContext = createContext();
export const addProfileResponseContext = createContext();
export const editProfileResponseContext = createContext();
export const addArtResponseContext = createContext();
export const editArtResponseContext = createContext();
export const deleteArtResponseContext = createContext();
export const deleteCartResponseContext = createContext();
export const cartLengthResponseContext = createContext();
export const cartToHeaderResponseContext = createContext();

function ContextShare({ children }) {

  const [isAuthToken, setIsAuthToken] = useState(false)
  const [addProfileResponse, setAddProfileResponse] = useState({})
  const [editProfileResponse, setEditProfileResponse] = useState({})
  const [addArtResponse, setAddArtResponse] = useState({})
  const [editArtResponse, setEditArtResponse] = useState({})
  const [deleteArtResponse, setDeleteArtResponse] = useState(false)
  const [deleteCartResponse, setDeleteCartResponse] = useState(false)
  const [cartLength, setCartLength] = useState({})
  const [cartToHeader, setCartToHeader] = useState(false)


  return (
    <cartToHeaderResponseContext.Provider value={{ cartToHeader, setCartToHeader }}>
      <cartLengthResponseContext.Provider value={{ cartLength, setCartLength }}>
        <deleteCartResponseContext.Provider value={{ deleteCartResponse, setDeleteCartResponse }}>
          <deleteArtResponseContext.Provider value={{ deleteArtResponse, setDeleteArtResponse }}>
            <editArtResponseContext.Provider value={{ editArtResponse, setEditArtResponse }}>
              <addArtResponseContext.Provider value={{ addArtResponse, setAddArtResponse }}>
                <editProfileResponseContext.Provider value={{ editProfileResponse, setEditProfileResponse }}>
                  <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
                    <addProfileResponseContext.Provider value={{ addProfileResponse, setAddProfileResponse }}>
                      {children}
                    </addProfileResponseContext.Provider>
                  </isAuthTokenContext.Provider>
                </editProfileResponseContext.Provider>
              </addArtResponseContext.Provider>
            </editArtResponseContext.Provider>
          </deleteArtResponseContext.Provider>
        </deleteCartResponseContext.Provider>
      </cartLengthResponseContext.Provider>
    </cartToHeaderResponseContext.Provider>

  )
}

export default ContextShare