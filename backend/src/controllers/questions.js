const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

// @route GET /dashboard ---------------------------------------------------------------------------------------
// @desc Read quiz
// @access Public
router.get("/", async (req, res) => {
  try {
    const quizes = await Quiz.find({});
    res.status(200).json({
      success: true,
      quizes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST /dashboard ------------------------------------------------------------------------------------
// @desc Create quiz
// @access Public
router.post("/", async (req, res) => {
  const { text, answer } = req.body;

  if (!text || !answer) {
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  }

  try {
    const newQuiz = new Quiz({
      text,
      answer,
    });

    await newQuiz.save();

    res.status(201).json({
      success: true,
      message: "Create successfully",
      quiz: newQuiz,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT /dashboard ------------------------------------------------------------------------------------
// @desc Update quiz
// @access Public
router.put("/:id", async (req, res) => {
  const { text, answer } = req.body;

  if (!text || !answer) {
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  }

  try {
    let updateQuiz = { text, answer };
    const updateCondition = { _id: req.params.id };

    updateQuiz = await Quiz.findOneAndUpdate(updateCondition, updateQuiz, {
      new: true,
    });
    console.log(updateQuiz);

    return res.status(201).json({
      success: true,
      message: "Update successfully",
      quiz: updateQuiz,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route DELETE /dashboard ------------------------------------------------------------------------------------
// @desc Delete quiz
// @access Public
router.delete("/:id", async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id };
    const deleteQuiz = await Quiz.findOneAndDelete(deleteCondition);

    return res.status(200).json({
      success: true,
      message: "Delete successfully",
      quiz: deleteQuiz,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
