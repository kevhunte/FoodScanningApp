const fetch = require('node-fetch')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const getToken = async () => {
    let res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`,{
        method: 'POST',
        headers: { 
            'content-type': 'application/json' 
        },
        body: JSON.stringify({
            "client_id": process.env.AUTH0_CLIENT_ID,
            "client_secret": process.env.AUTH0_CLIENT_SECRET,
            "audience": process.env.AUTH0_API_IDENTIFIER,
            "grant_type":"client_credentials"
        })
    })

    let data = await res.json()

    return data.access_token
}


/*This function will serve as a batch call to USDA. And load all of the returned data into Cassandra*/
 const getFoodsFromUSDA = async () => {

//     // 
//     getFoodFromUSDA(foodId).then(data => {

//                 if (data) {
    
//                     let processed = {
//                         foodId: data.gtinUpc,
//                         name: data.description,
//                         ingredients: data.ingredients,
//                         servingSize: data.servingSize,
//                         servingSizeUnit: data.servingSizeUnit,
//                         labelNutrients: data.labelNutrients
//                     }
                    
//                     Object.keys(processed.labelNutrients).forEach(nutrient => {
//                       processed.labelNutrients[nutrient] = processed.labelNutrients[nutrient].value
//                     })
    
//                     res.status(200).json(processed)
//                     saveFoodToCassandra(processed)
                    
//                     return
    
//                }
 }

module.exports = {getToken, getFoodsFromUSDA}