const { response, request } = require("express");
const deleteService = require("../services/deleteService");
const { encryptPassword, generateSalt } = require("../crypto/encryption");

const deleteHabilidadCompetencia = async (req, res) => {
  try {
    const { id_competencia_habilidad } = req.body;

    const deleted = await deleteService.deleteHabilidadCompetenciaService(
      id_competencia_habilidad
    );

    if (deleted) {
      return res
        .status(200)
        .json({ success: true, message: "Row deleted successfully" });
    } else {
      return res
        .status(404)
        .json({
          success: false,
          message: "Row not found or could not be deleted",
        });
    }
  } catch (error) {
    console.error("Error deleting row:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  deleteHabilidadCompetencia,
};
