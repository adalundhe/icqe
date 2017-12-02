import ApolloClient from 'apollo-client'
import { HTTPFetchNetworkInterface } from 'apollo-client'

const getUserInfo = () => ({user: JSON.parse(localStorage.getItem('user')), address: JSON.parse(localStorage.getItem('address'))})


class NetworkInterface extends HTTPFetchNetworkInterface {
  setUri(uri) {
    this._uri = uri
  }
}

const createClient = (uri) => {

  const client = new ApolloClient({
    networkInterface: new NetworkInterface(uri),
    dataIdFromObject: o => o.id
  })

  return client
}


const ClientInterface = {
  client: {},
  networkInterface: {},
  setInterface(uri){
    this.networkInterface.setUri(uri)
    return this
  },
  newClient(uri){
    this.networkInterface = new NetworkInterface(uri)
    this.client = new ApolloClient({
      networkInterface: this.networkInterface,
      dataIdFromObject: o => o.id
    })
    return this
  }
}

const DefaultInterface = ClientInterface.newClient('http://localhost:3000/user-profile/userql')

export {createClient, ClientInterface, DefaultInterface, getUserInfo}
