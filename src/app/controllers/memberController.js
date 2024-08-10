const MemberService = require("../../domain/member/memberService");

const addMember = async (req, res) => {
  try {
    const memberService = new MemberService();
    const memberInfo = req.body;
    const member = await memberService.addMember(memberInfo);
    res
      .status(201)
      .json({ message: "Member added successfully", result: member });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const memberService = new MemberService();
    const members = await memberService.findAll();
    res.status(200).json({ result: members });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findByCode = async (req, res) => {
  try {
    const memberService = new MemberService();
    const code = req.params.code;
    const member = await memberService.findByCode(code);
    res.status(200).json({ result: member });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMember = async (req, res) => {
  try {
    const memberService = new MemberService();
    const code = req.params.code;
    const memberInfo = req.body;
    const member = await memberService.updateMember(code, memberInfo);
    res
      .status(200)
      .json({ message: "Member updated successfully", result: member });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeMember = async (req, res) => {
  try {
    const memberService = new MemberService();
    const code = req.params.code;
    await memberService.removeMember(code);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addMember,
  findAll,
  findByCode,
  updateMember,
  removeMember,
};
