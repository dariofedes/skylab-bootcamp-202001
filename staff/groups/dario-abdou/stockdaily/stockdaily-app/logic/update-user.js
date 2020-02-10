function updateUser(favId, callback) {

    const { token } = sessionStorage



    getUserInfo(token, userInfo => {

        let watching =  userInfo.watching || [];

        if (watching.includes(favId)) {
            watching = watching.filter(f => f !== favId);
        } else {
           watching = [...watching, favId]
        }
    
        call('https://skylabcoders.herokuapp.com/api/v2/users/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({watching})
        }, response => {
            // if(response instanceof Error) console.log("errorrrr")
    
             callback()
        } )

    })

}