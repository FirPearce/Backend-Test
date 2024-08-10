const MemberService = require("../../domain/member/memberService");

const verifyMember = async (req, res, next) => {
  const { code } = req.params;
  const memberService = new MemberService();

  try {
    if (!code) {
      return res.status(400).json({ message: "Member code is required" });
    }

    const member = await memberService.findByCode(code);

    if (!member) {
      return res.status(400).json({ message: "Member not found" });
    }

    const penalizedDate = member.penalize_date;
    const dateNow = new Date();
    if (penalizedDate !== null) {
      if (dateNow >= penalizedDate) {
        await memberService.updateMember(code, {
          status_member: "Active",
          penalize_date: null,
        });
      }
    }

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = verifyMember;
