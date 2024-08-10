const Member = require("./member");

class MemberRepository {
  async addMember(memberInfo) {
    const member = Member(memberInfo);
    await member.save();
    return member;
  }

  async findByCode(memberCode) {
    return Member.findOne({ code: memberCode });
  }

  async findAll() {
    return Member.find();
  }

  async updateMember(memberCode, memberInfo) {
    return Member.updateOne({ code: memberCode }, memberInfo);
  }

  async removeMember(memberCode) {
    return Member.deleteOne({ code: memberCode });
  }
}

module.exports = MemberRepository;
