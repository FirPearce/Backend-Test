const MemberRepository = require("./memberRepository");

class MemberService {
  constructor() {
    this.memberRepository = new MemberRepository();
  }

  async addMember(memberInfo) {
    return this.memberRepository.addMember(memberInfo);
  }

  async findByCode(code) {
    return this.memberRepository.findByCode(code);
  }

  async findAll() {
    return this.memberRepository.findAll();
  }

  async updateMember(code, memberInfo) {
    return this.memberRepository.updateMember(code, memberInfo);
  }

  async removeMember(code) {
    return this.memberRepository.removeMember(code);
  }
}

module.exports = MemberService;
