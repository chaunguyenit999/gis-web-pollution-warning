const Air = require("../../models/AirModel");
const calcResult = require("../../helpers/calc-env_result");

const airRender = {
  // GET ENVIRONMENT DATA MANAGEMENT PAGE
  getAirPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Quản trị",
          link: "/admin/dashboard/home",
        },
        {
          tag: "Dữ liệu môi trường",
          link: "#",
        },
        {
          tag: "Trạm quan trắc",
          link: "#",
        },
        {
          tag: "Dữ liệu không khí",
          link: "/admin/management/env-data/stations/air",
        },
      ],
      title: "Admin | Dữ liệu không khí",
      page_required: {
        // css_path and script_path start from "pages" folder
        css_path: "management/env_data/stations/air/_css",
        script_path: "management/env_data/stations/air/_script",
      },
      description: "Gis Web Management",
    };

    return res.render("pages/management/env_data/stations/air/air.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
  fetchDataTables: async (req, res) => {
    switch (req.body.actionType) {
      case "getAllData":
        const draw = req.body.draw;
        const start = parseInt(req.body.start);
        const length = parseInt(req.body.length);

        let query = {};
        if (req.body.search.value) {
          const searchValue = req.body.search.value;
          console.log("search value: ", searchValue);
          query.$or = [
            { "location.address": { $regex: searchValue, $options: "i" } },
            // { "location.latitude": { $regex: searchValue, $options: "i" } },
            // { "location.longitude": { $regex: searchValue, $options: "i" } },
            // { date: { $regex: searchValue, $options: "i" } },
            // { windDegree: { $regex: searchValue, $options: "i" } },
            // { humidity: { $regex: searchValue } },
            // { windSpeed: { $regex: searchValue, $options: "i" } },
            // { windDust: { $regex: searchValue, $options: "i" } },
            // { sulfurDioxide: { $regex: searchValue, $options: "i" } },
            // { nitoDioxit: { $regex: searchValue, $options: "i" } },
            // { result: { $regex: searchValue, $options: "i" } },
          ];
        }

        const sortQuery = {};
        if (req.body.order) {
          let columns = req.body.columns;
          let order = req.body.order;
          const sortColumn = columns[order[0].column].data;
          const sortDirection = order[0].dir === "asc" ? 1 : -1;
          sortQuery[sortColumn] = sortDirection;
        }

        Air.countDocuments(query, function (err, totalCount) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
          }
          Air.find(query)
            .sort(sortQuery)
            .skip(start)
            .limit(length)
            .exec(function (err, data) {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: err });
              }
              const formattedData = data.map((item) => ({
                _id: item._id,
                address: item.location.address,
                latitude: item.location.latitude,
                longitude: item.location.longitude,
                date: item.date,
                wind_degree: item.wind_degree,
                humidity: item.humidity,
                wind_speed: item.wind_speed,
                wind_dust: item.wind_dust,
                sulfur_dioxide: item.sulfur_dioxide,
                nito_dioxit: item.nito_dioxit,
                result: item.result,
              }));
              res.status(200).json({
                draw,
                recordsTotal: totalCount,
                recordsFiltered: totalCount,
                data: formattedData,
              });
            });
        });
        break;

      case "insertData":
        try {
          const newAir = new Air(req.body.actionData);
          const savedAir = await newAir.save();
          res.status(200).json(savedAir);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
        break;

      case "updateDataById":
        try {
          const id = req.body.actionData._id; // get the record need to update
          const result = await calcResult.air(req.body.actionData); // calculate result with req.body
          const updateValue = { ...req.body.actionData, result: result }; // create the new update value
          const air = await Air.findById(id); // get the old record
          await air.updateOne({ $set: updateValue }); // $set make unique value
          res.status(200).json({ ...updateValue, _id: id }); // return the update value
        } catch (error) {
          res.status(500).json({ message: error });
        }
        break;

      case "delDataById":
        try {
          const id = req.body.actionId;
          await Air.findByIdAndDelete(id);
          res.status(200).json(id);
        } catch (error) {
          res.status(500).json(err);
        }
      default:
        break;
    }
  },
};

module.exports = airRender;
