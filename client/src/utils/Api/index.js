import axios from 'axios'

export default {
  // ===========================================================================
  // Admin Routes
  // ===========================================================================
  // get all admins
  getAllAdmins: async () => {
    const res = await axios.get('/api/admins')
    return res.data || []
  },
  // get an Admin
  getAnAdminById: async adminId => {
    const res = await axios.get(`/api/admins/${adminId}`)
    return res.data || []
  },
  // save an admin
  saveAnAdmin: async adminData => {
    const res = await axios.post('/api/admins', adminData)
    return res.data || []
  },
  // delete an admin
  deleteAnAdmin: async id => {
    const res = await axios.delete(`/api/admins/${id}`)
    return res.data || []
  },
  // ===========================================================================
  // Family/Parent Routes
  // ===========================================================================
  // get all families
  getAllFamilies: async () => {
    const res = await axios.get('/api/families')
    return res.data || []
  },
  getFamilyById: async familyId => {
    const res = await axios.get(`/api/families/${familyId}`)
    return res.data || []
  },
  // save a family
  saveAFamily: async familyData => {
    const res = await axios.post('/api/families', familyData)
    return res.data || []
  },
  // delete a family
  deleteAFamily: async id => {
    const res = await axios.delete(`/api/families/${id}`)
    return res.data || []
  },
  // ===========================================================================
  // User Routes ---ALL OF THESE MAY NOT WORK, NEED TO FOLLOW UP WiTH K.C.
  // ===========================================================================
  // get all Users
  getAllUsers: async () => {
    const res = await axios.get('/api/users')
    return res.data || []
  },
  // get a User
  getAUser: async userId => {
    const res = await axios.get(`/api/users/${userId}`)
    return res.data || []
  },
  // save a User
  saveAUser: async userData => {
    const res = await axios.post('/api/users/', userData)
    return res.data || []
  },
  // delete a User
  deleteAUser: async id => {
    const res = await axios.delete(`/api/users/${id}`)
    return res.data || []
  },

  // ===========================================================================
  // Get User and populate familyid
  // ===========================================================================
  getUserFamily: async id => {
    const res = await axios.get(`/api/users/current/family`, id)
    return res.data || []
  }
}
