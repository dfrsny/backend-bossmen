const db = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM Bahan_Baku ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data bahan baku" });
  }
};

exports.create = async (req, res) => {
  const { nama_bahan_baku, jumlah_stok, unit_satuan, id_cabang } = req.body;
  try {
    const [result] = await db.execute(
      `INSERT INTO Bahan_Baku (nama_bahan_baku, jumlah_stok, unit_satuan, id_cabang)
       VALUES (?, ?, ?, ?)`,
      [nama_bahan_baku, jumlah_stok, unit_satuan, id_cabang]
    );
    res
      .status(201)
      .json({ message: "Bahan baku ditambahkan", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan bahan baku" });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nama_bahan_baku, jumlah_stok, unit_satuan, id_cabang } = req.body;
  try {
    await db.execute(
      `UPDATE Bahan_Baku SET nama_bahan_baku = ?, jumlah_stok = ?, unit_satuan = ?, id_cabang = ? WHERE id_bahan_baku = ?`,
      [nama_bahan_baku, jumlah_stok, unit_satuan, id_cabang, id]
    );
    res.json({ message: "Bahan baku diupdate" });
  } catch (err) {
    res.status(500).json({ message: "Gagal update bahan baku" });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute(`DELETE FROM Bahan_Baku WHERE id_bahan_baku = ?`, [id]);
    res.json({ message: "Bahan baku dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal hapus bahan baku" });
  }
};
