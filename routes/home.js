const { Router } = require("express");
const { supabase } = require("../util/supabase");
const router = Router();

router.get("/", async (req, res) => {
  const fetchData = async () => {
    const { data, error } = await supabase.from("all_details").select();

    if (error) {
      console.log(error);
      return [];
    } else {
      console.log(data);
      return data;
    }
  };

  const data = await fetchData();
  //   console.log(data);
  //   res.json(data);
  res.render('userbase',{data});
});

module.exports = router;
