const { supabase } = require('../util/supabase')
const fetchData = async () => {
    const { data, error } = await supabase
        .from('all_details')
        .select()
    if (error) {
        console.log(error);
    }
    else {
        console.log(data);
    }
}

module.exports = fetchData;