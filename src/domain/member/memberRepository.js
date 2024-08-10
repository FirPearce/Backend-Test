const Member = require("./member");

class MemberRepository {
  async addMember(memberInfo) {
    const member = Member(memberInfo);
    await member.save();
    return member;
  }

  async findByCode(code) {
    return Member.findOne({ code });
  }

  async findAll() {
    return Member.find();
  }

  async updateMember(code, memberInfo) {
    return Member.updateOne({ code }, memberInfo);
  }

  async removeMember(code) {
    return Member.deleteOne({ code });
  }
}

module.exports = MemberRepository;
