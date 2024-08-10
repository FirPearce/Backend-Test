const Member = require("./member");

class MemberRepository {
  async addMember(memberInfo) {
    const member = Member(memberInfo);
    await member.save();
    return await member;
  }

  async findByCode(memberCode) {
    return await Member.findOne({ code: memberCode });
  }

  async findAll() {
    return await Member.find();
  }

  async updateMember(memberCode, memberInfo) {
    return await Member.updateOne({ code: memberCode }, memberInfo);
  }

  async removeMember(memberCode) {
    return await Member.deleteOne({ code: memberCode });
  }
}

module.exports = MemberRepository;
